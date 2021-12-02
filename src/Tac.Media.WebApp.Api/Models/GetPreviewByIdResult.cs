namespace Tac.Media.WebApp.Api.Models
{
    public class GetPreviewByIdResult
    {
        public GetPreviewByIdResult(string twitterImage, string instagramImage)
        {
            TwitterImage = twitterImage;
            InstagramImage = instagramImage;
        }

        public string TwitterImage { get; }
        public string InstagramImage { get; }
    }
}
