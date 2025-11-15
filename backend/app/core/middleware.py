from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:4200",    # frontend dev
            "https://prod-url.com"      # frontend prod
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
