import azure.functions as func
import logging

# Create Azure Functions app
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# Wrap FastAPI with Azure Functions ASGI handler
@app.function_name(name="HttpTrigger")
@app.route(route="{*route}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def handle_request(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        from main import app as fastapi_app
        return await func.AsgiMiddleware(fastapi_app).handle_async(req)
    except Exception as e:
        logging.exception("Error handling request or importing app")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)
