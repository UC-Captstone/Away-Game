import azure.functions as func
import logging

# Import FastAPI app and wrap it once at module level.
# Doing this inside the handler would re-import and re-create the middleware
# on every request, adding 20-100 ms of unnecessary overhead per call.
try:
    from main import app as fastapi_app
    _asgi_handler = func.AsgiMiddleware(fastapi_app)
except Exception:  # pragma: no cover
    logging.exception("Failed to initialise FastAPI app at module load")
    raise

# Create Azure Functions app
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# Wrap FastAPI with Azure Functions ASGI handler
@app.function_name(name="HttpTrigger")
@app.route(route="{*route}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def handle_request(req: func.HttpRequest) -> func.HttpResponse:
    if _asgi_handler is None:
        return func.HttpResponse("Application failed to initialise", status_code=500)
    return await _asgi_handler.handle_async(req)

@app.function_name(name="NightlyTaskTimer")
@app.timer_trigger(schedule="0 0 5 * * *", arg_name="myTimer", run_on_startup=False, use_monitor=False)
async def nightly_task_timer(myTimer: func.TimerRequest) -> None:
    logging.info('Nightly task timer trigger function executed.')
    
    try:
        from scheduled.nightly_tasks import run_nightly_task
        await run_nightly_task()
    except Exception as e:
        logging.exception("Error running nightly task")
        raise
