using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Logic.QueryParameters;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace Tac.Media.WebApp.Api.Controllers
{
    [ApiController]
    [Route("api/twitter")]
    public class TwitterController
    {
        private readonly ILogger<TwitterController> _logger;

        public TwitterController(ILogger<TwitterController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public async Task Test()
        {
            //var client = new TwitterSharp.Client.TwitterClient("AAAAAAAAAAAAAAAAAAAAAOV3UgEAAAAAJRb%2BYDNT7W6Itw%2BzaQJkJOWWDqg%3DwJ9911HXETDU2JkC8MYT8oyee2dJ0eetxLzcCm6Lxby09LuLUe");

            //var answer = await client.GetTweetAsync("1389189291582967809");


            //var request = new TwitterSharp.Request.StreamRequest(
            //    Expression.Author("moricalliope") // using TwitterSharp.Rule;
            //        .Or(
            //            Expression.Author("takanashikiara"),
            //            Expression.Author("ninomaeinanis"),
            //            Expression.Author("gawrgura"),
            //            Expression.Author("watsonameliaEN")
            //        )
            //, "Anime");

            //var t = await client.AddTweetStreamAsync(request);

            var userClient = new TwitterClient("lcrfpBzN820UJTJpaxAXt6R6f", "xCW9M9xcmwt5qPLYBaAfyz59t6ScOboZvjW4RsdNnrrj31mCD3", "1248760346619383809-AqUCguOhbWEKrt4H2spcBK3TlmIURW", "bAYdRsbI52sj08s80Mzgvj5m1gMXMg5JaDPumfUUPJRgW");
            var user = await userClient.Users.GetAuthenticatedUserAsync();

            var tweetinviLogoBinary = File.ReadAllBytes("D:/Temp/Banners/86d51b1a-46a4-4ec7-a774-ee71c1922c3f/twitter.jpeg");

            var uploadedImage = await userClient.Upload.UploadTweetImageAsync(tweetinviLogoBinary);

            //await userClient.Upload.AddMediaMetadataAsync(new MediaMetadata(uploadedImage)
            //{
            //    AltText = "@repuspt",

            //});

          
            var homeTimelineResult = await userClient.Execute.RequestAsync(request =>
            {
                request.Url = "https://api.twitter.com/2/tweets";
                request.HttpMethod = Tweetinvi.Models.HttpMethod.POST;
                request.HttpContent = JsonContent.Create(new
                {
                    text = "Test direct request",
                    media = new
                    {
                        media_ids = new[] { uploadedImage.Id },
                    }
                });
            });

            var jsonResponse = homeTimelineResult.Content;

            //var homeTimelineResult = await userClient.Execute.RequestAsync(request =>
            //{
            //    request.Url = "https://api.twitter.com/2/tweets";
            //    request.HttpMethod = HttpMethod.POST;
            //    request.HttpContent = new HttpContent();
            //});

            //var jsonResponse = homeTimelineResult.Content;


            //var tweetWithImage = await userClient.Tweets.PublishTweetAsync(new PublishTweetParameters("Tweet with an image @agency_clan")
            //{
            //    Medias = { uploadedImage }
            //});

            //var tweet = await userClient.Tweets.PublishTweetAsync(new PublishTweetParameters("A complex tweet from Tweetinvi")
            //{
            //    Coordinates = new Coordinates(37.7821120598956, -122.400612831116),
            //    DisplayExactCoordinates = true,
            //    TrimUser = true,
            //    PlaceId = "3e8542a1e9f82870",
            //    PossiblySensitive = true,
            //    Medias = 
            //});
        }
    }
}


