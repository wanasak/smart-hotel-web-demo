using System;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace SmartHotel_public_web
{
    public class PhotoUploader
    {
        private readonly StorageCredentials _credentials;
        private readonly CloudStorageAccount _storageAccount;
        private readonly CloudBlobClient _blobClient;

        public PhotoUploader(string name, string constr)
        {
            _credentials = new StorageCredentials(name, constr);
            _storageAccount = new CloudStorageAccount(_credentials, useHttps: true);
            _blobClient = _storageAccount.CreateCloudBlobClient();
        }

        public async Task<CloudBlockBlob> UploadPetPhoto(byte[] content)
        {
            var petsContainer = _blobClient.GetContainerReference("pets");
            await petsContainer.CreateIfNotExistsAsync();


            var newBlob = petsContainer.GetBlockBlobReference(Guid.NewGuid().ToString());
            await newBlob.UploadFromByteArrayAsync(content, 0, content.Length);
            return newBlob;
        }
    }
}