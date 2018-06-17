namespace SmartHotel_public_web.Services
{
    public interface ICustomerTestimonialService
    {
        CustomerTestimonial GetTestimonial();
    }

    public class CustomerTestimonial
    {
        public string CustomerName { get; set; }
        public string Text { get; set; }

    }
}