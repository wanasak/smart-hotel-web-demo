using System;
using Newtonsoft.Json;

namespace SmartHotel_public_web.Controllers
{
    public class PetDocument
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string PetName { get; set; }
        public string MediaUrl { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime Created { get; set; }
        public string Message { get; set; }
    }
}