using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using SmartHotel_public_web.Services;

namespace SmartHotel_public_web.Controllers
{
    public class PetUploadRequest
    {
        public string Base64 { get; set; }
        public string Name { get; set; }
    }

    [Route("api/pets")]
    public class PetsApiController : Controller
    {
        private readonly SettingsService _settingsSvc;
        private readonly string dbName = "pets";
        private readonly string colName = "checks";

        public PetsApiController(SettingsService settingsSvc)
        {
            this._settingsSvc = settingsSvc;
        }

        [HttpPost]
        public async Task<IActionResult> UploadPetImageAsync([FromBody]PetUploadRequest petRequest)
        {
            if (string.IsNullOrEmpty(petRequest?.Base64)) return BadRequest();

            var tokens = petRequest.Base64.Split(',');
            var ctype = tokens[0].Replace("data:", "");
            var base64 = tokens[1];
            var content = Convert.FromBase64String(base64);

            // Upload photo to storage...
            var blobUri = await UploadPetToStorage(content);

            // Then create a Document in Cosmodb to notify our Function
            var identifier = await UploadDocument(blobUri, petRequest.Name ?? "Bob");

            return Ok(identifier);
        }

        private async Task<Guid> UploadDocument(Uri uri, string petName)
        {
            var endpoint = new Uri(_settingsSvc.LocalSettings.PetsConfig.CosmosUri);
            var auth = _settingsSvc.LocalSettings.PetsConfig.CosmosKey;
            var client = new DocumentClient(endpoint, auth);
            var identifier = Guid.NewGuid();

            await client.CreateDatabaseIfNotExistsAsync(new Database() { Id = dbName });
            await client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(dbName),
                new DocumentCollection { Id = colName });

            await client.CreateDocumentAsync(
                UriFactory.CreateDocumentCollectionUri(dbName, colName),
                new PetDocument
                {
                    Id = identifier,
                    IsApproved = null,
                    PetName = petName,
                    MediaUrl = uri.ToString(),
                    Created = DateTime.UtcNow
                });

            return identifier;
        }

        private async Task<Uri> UploadPetToStorage(byte[] content)
        {
            var storageName = _settingsSvc.LocalSettings.PetsConfig.BlobName;
            var auth = _settingsSvc.LocalSettings.PetsConfig.BlobKey;
            var uploader = new PhotoUploader(storageName, auth);
            var blob = await uploader.UploadPetPhoto(content);

            return blob.Uri;
        }
    }
}