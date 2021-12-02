using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tac.Media.WebApp.Api.Configurations;
using Tac.Media.WebApp.Api.Models;

namespace Tac.Media.WebApp.Api.Controllers
{
    
    [ApiController]
    [Route("api/banner")]
    public class BannerController
    {
        private readonly ILogger<BannerController> _logger;
        private readonly BannerConfigurations _bannerConfigurations;

        public BannerController(ILogger<BannerController> logger, IOptions<BannerConfigurations> bannerConfigurations)
        {
            _logger = logger;
            _bannerConfigurations = bannerConfigurations.Value;
        }

        [HttpPost("generate-url")]
        public GenerateBannerUrlResponse GenerateBannerUrlAsync(GenerateBannerUrlRequest request)
        {
            var guid = Guid.NewGuid();
            var tempDirectory = _bannerConfigurations.TempDir + "\\" + guid;

            try
            {
                if (Directory.Exists(tempDirectory))
                {
                    Console.WriteLine("That path exists already.");
                }

                Directory.CreateDirectory(tempDirectory);
                Console.WriteLine("The directory was created successfully at {0}.", Directory.GetCreationTime(tempDirectory));
            }
            catch (Exception e)
            {
                throw new Exception("Cant create direcotry.");
            }

            SaveImageBase64OnTempDirectory(tempDirectory + "\\instagram.png", request.InstagramBase64);
            SaveImageBase64OnTempDirectory(tempDirectory + "\\twitter.png", request.TwitterBase64);

            return new GenerateBannerUrlResponse
            {
                Guid = guid.ToString()
            };
        }

        private void SaveImageBase64OnTempDirectory(string directory, string imageBase64)
        {
            byte[] bytes = Convert.FromBase64String(imageBase64);

            Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = Image.FromStream(ms);
            }

            image.Save(directory, System.Drawing.Imaging.ImageFormat.Png);
        }
    }
}
