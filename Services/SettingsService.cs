using System;
using System.Net.Http;
using Newtonsoft.Json;
using SmartHotel_public_web.Models.Settings;

namespace SmartHotel_public_web.Services
{
    public class SettingsService
    {
        public ServerSettings GlobalSettings { get; }
        public LocalSettings LocalSettings { get; set; }

        private SettingsService(ServerSettings settings, LocalSettings localSettings)
        {
            GlobalSettings = settings;
            LocalSettings = localSettings;
        }

        public static SettingsService Load(LocalSettings localSettings)
        {
            using (var client = new HttpClient())
            {
                using (var response = client.GetAsync(new Uri(localSettings.SettingsUrl)).Result)
                {
                    response.EnsureSuccessStatusCode();
                    string responseBody = response.Content.ReadAsStringAsync().Result;
                    var model = JsonConvert.DeserializeObject<ServerSettings>(responseBody);
                    model.Production = localSettings.Production;
                    model.FakeAuth = localSettings.FakeAuth;

                    return new SettingsService(model, localSettings);
                }
            }
        }
    }
}