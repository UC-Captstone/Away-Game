import azure.functions as func
from main import app as fastapi_app
import logging

# Create Azure Functions app
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# Wrap FastAPI with Azure Functions ASGI handler
@app.function_name(name="HttpTrigger")
@app.route(route="{*route}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def handle_request(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    return await func.AsgiMiddleware(fastapi_app).handle_async(req)
