namespace Tac.Media.WebApp.Api.Models
{
    public class GenerateBannerUrlRequest
    {
        public GenerateBannerUrlRequest(string instagramBase64, string twitterBase64)
        {
            InstagramBase64 = instagramBase64;
            TwitterBase64 = twitterBase64;
        }

        public string InstagramBase64 { get; }
        
        public string TwitterBase64 { get; }
    }
}
