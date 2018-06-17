namespace SmartHotel_public_web.Models.Settings
{
    public class LocalSettings
    {
        public LocalSettings()
        {
            FakeAuth = new FakeAuthSettings();
            PetsConfig = new PetsConfig();
        }
        public bool Production { get; set; }   
        public string SettingsUrl { get; set; }
        public FakeAuthSettings FakeAuth { get; set; }
        public PetsConfig PetsConfig { get; set; }
    }
}