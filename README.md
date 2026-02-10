# IMDb API 🎬

A powerful, serverless IMDb API built with Cloudflare Workers. This API provides fast and reliable access to movie and TV show information from IMDb with enhanced error handling and null safety.

![IMDb API](https://user-images.githubusercontent.com/51857187/170807293-a52d8141-f743-4501-82e5-55e3d4286e61.jpg)

## ✨ Features

- 🔍 **Search Movies & TV Shows** - Search titles by name
- 🎯 **Get Detailed Information** - Fetch complete movie/show details by IMDb ID
- 📝 **Reviews & Ratings** - Access user reviews with pagination support
- 📺 **Series Episodes** - Get episode information for TV series
- 👤 **User Profiles** - Fetch user information and ratings
- ⚡ **High Performance** - Powered by Cloudflare Workers
- 🛡️ **Error Handling** - Enhanced null safety and error handling
- 💾 **Cacheable Results** - Optimized for caching

## 🚀 Quick Start

### Live API
The API is deployed and ready to use at: `https://imdb-api.k-drama.workers.dev`

### Deploy Your Own

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/masudranaxpert/imdb-api)

## 📡 API Endpoints

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/` | GET | API status and information | [Try It](https://imdb-api.k-drama.workers.dev/) |
| `/search?query={query}` | GET | Search titles by name | [Try It](https://imdb-api.k-drama.workers.dev/search?query=Inception) |
| `/title/{imdb_id}` | GET | Get detailed title information | [Try It](https://imdb-api.k-drama.workers.dev/title/tt1375666) |
| `/reviews/{imdb_id}` | GET | Get title reviews | [Try It](https://imdb-api.k-drama.workers.dev/reviews/tt1375666) |
| `/title/{imdb_id}/season/{season_id}` | GET | Get series season information | [Try It](https://imdb-api.k-drama.workers.dev/title/tt0944947/season/1) |
| `/user/{user_id}` | GET | Get user profile information | [Try It](https://imdb-api.k-drama.workers.dev/user/ur82525142) |
| `/user/{user_id}/ratings` | GET | Get user ratings and reviews | [Try It](https://imdb-api.k-drama.workers.dev/user/ur82525142/ratings) |

### Query Parameters

#### Reviews Endpoint
- `option`: `helpfulness`, `date`, `votes`, `rating`
- `sortOrder`: `asc`, `desc`
- `nextKey`: For pagination

#### User Ratings Endpoint
- `sort`: `most_recent`, `oldest`, `top_rated`, `worst_rated`
- `ratingFilter`: `1-10` (filter by rating)

## 🛠️ Installation & Development

### Prerequisites
- Node.js 16+
- Cloudflare account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/masudranaxpert/imdb-api.git
   cd imdb-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

### Deployment

1. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **Deploy to Cloudflare Workers**
   ```bash
   npm run publish
   ```

## 🐋 Docker Support

Run with Docker:

```bash
# Build the image
docker build -t imdb-api .

# Run the container
docker run -p 3000:3000 -it -d imdb-api
```

## 🔧 Configuration

### Environment Variables
No environment variables required. The API works out of the box.

### Caching
For optimal performance, map your worker to a custom domain to enable Cloudflare's caching features.

## 📊 Response Examples

### Search Response
```json
{
  "query": "Inception",
  "message": "Found 10 titles",
  "results": [
    {
      "id": "tt1375666",
      "title": "Inception",
      "year": 2010,
      "type": "movie",
      "image": "https://...",
      "api_path": "/title/tt1375666",
      "imdb": "https://www.imdb.com/title/tt1375666"
    }
  ]
}
```

### Title Details Response
```json
{
  "id": "tt1375666",
  "title": "Inception",
  "plot": "A thief who steals corporate secrets...",
  "rating": {
    "star": 8.8,
    "count": 2300000
  },
  "genre": ["Action", "Sci-Fi", "Thriller"],
  "year": 2010,
  "runtime": "148 min",
  "directors": ["Christopher Nolan"],
  "actors": ["Leonardo DiCaprio", "Marion Cotillard"]
}
```

## 🔄 Version History

### v2.1.0 (Current)
- ✅ Fixed null/undefined errors for `plotText` and `countries` properties
- ✅ Enhanced error handling across all endpoints
- ✅ Improved null safety for series data
- ✅ Updated dependencies and compatibility
- ✅ Better fallback values for missing data

### v1.0.3 (Previous)
- Basic IMDb API functionality
- Search, title details, reviews, user data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an unofficial API and is not affiliated with IMDb. Please use responsibly and in accordance with IMDb's terms of service.

## 👨‍💻 Author

**masudranaxpert**
- GitHub: [@masudranaxpert](https://github.com/masudranaxpert)
- Email: masudranaxpert@gmail.com

## 🌟 Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ using Cloudflare Workers**
