from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:4200",    # frontend dev
            "http://localhost:8080",
            "https://away-game-dev-d0fgf9bgfecff3hf.canadacentral-01.azurewebsites.net",
            "https://away-game-prd-cycbgxangbh4dmeq.canadacentral-01.azurewebsites.net",
            "https://prod-url.com"      # frontend prod
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
