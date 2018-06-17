using Microsoft.AspNetCore.Mvc;
using SmartHotel_public_web.Services;

namespace SmartHotel_public_web.Controllers
{
    [Route("api/testimonials")]
    public class TestimonialsController : Controller
    {
        private readonly ICustomerTestimonialService _testimonialService;

        public TestimonialsController(ICustomerTestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var testimonial = _testimonialService.GetTestimonial();

            return Json(testimonial);
        }
    }
}