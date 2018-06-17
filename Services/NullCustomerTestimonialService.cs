using System;

namespace SmartHotel_public_web.Services
{
    public class NullCustomerTestimonialService : ICustomerTestimonialService
    {
        public CustomerTestimonial GetTestimonial()
        {
            throw new CustomerTestimonialServiceNotConfiguredException();
        }
    }

    public class CustomerTestimonialServiceNotConfiguredException: ApplicationException
    {
        public CustomerTestimonialServiceNotConfiguredException() 
            : base("No customer testimonial service configured")
        {
        }
    }
}