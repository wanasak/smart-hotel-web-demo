using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SmartHotel_public_web.Services;
using SmartHotel_public_web.Models.Settings;
using System;

namespace SmartHotel_public_web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ServerSettings _globalSettings;

        public HomeController(SettingsService settingsService)
        {
            _globalSettings = settingsService.GlobalSettings;
        }
        public IActionResult Index()
        {
            return View(_globalSettings);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}