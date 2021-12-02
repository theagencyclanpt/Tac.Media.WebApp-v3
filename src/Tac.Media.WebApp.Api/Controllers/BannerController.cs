using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using System;
using System.IO;
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
        [HttpGet("preview-by-id")]
        public async Task<GetPreviewByIdResult> GetPreviewById([FromQuery] string Id)
        {
            var tempDirectory = _bannerConfigurations.TempDir + "/" + Id;

            if (Directory.Exists(tempDirectory))
            {
                return new GetPreviewByIdResult(
                    await GetImageBase64FromDirectory(tempDirectory + "/twitter.png"),
                    await GetImageBase64FromDirectory(tempDirectory + "/instagram.png")
                );
            }

            return null;
        }

        [HttpPost("generate-url")]
        public async Task<GenerateBannerUrlResponse> GenerateBannerUrlAsync(GenerateBannerUrlRequest request)
        {
            var guid = Guid.NewGuid();
            var tempDirectory = _bannerConfigurations.TempDir + "/" + guid;

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
                throw new Exception("Cant create direcotry: " + tempDirectory, e);
            }

            await SaveImageBase64OnTempDirectory(tempDirectory + "/instagram.png", request.InstagramBase64);
            await SaveImageBase64OnTempDirectory(tempDirectory + "/twitter.png", request.TwitterBase64);

            return new GenerateBannerUrlResponse(guid.ToString());
        }

        private async Task SaveImageBase64OnTempDirectory(string directory, string imageBase64)
        {
            byte[] bytes = Convert.FromBase64String(imageBase64);


            using (var image = Image.Load(bytes))
            {
                 await image.SaveAsPngAsync(directory);
            }
        }

        private async Task<string> GetImageBase64FromDirectory(string directory)
        {
            var t = await Image.LoadAsync(directory);

            return t.ToBase64String(PngFormat.Instance);
        }
    }
}
