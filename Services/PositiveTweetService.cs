using Microsoft.Extensions.Options;
using SmartHotel_public_web.Models.Settings;

namespace SmartHotel_public_web.Services
{
    public class PositiveTweetService : ICustomerTestimonialService
    {
        private IOptions<LocalSettings> localSettings;

        public PositiveTweetService(IOptions<LocalSettings> localSettings)
        {
            this.localSettings = localSettings;
        }
        public CustomerTestimonial GetTestimonial()
        {
            var model = new CustomerTestimonial
            {
                CustomerName = "BethMassi",
                Text = "This hotel is super high tech! I'd recommend it to anyone."
            }; 

            return model;            
        }
    }
}