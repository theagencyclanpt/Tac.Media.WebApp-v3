namespace Tac.Media.WebApp.Api.Models
{
    public class GenerateBannerUrlResponse
    {
        public GenerateBannerUrlResponse(string guid)
        {
            Guid = guid;
        }

        public string Guid { get; }
    }
}
