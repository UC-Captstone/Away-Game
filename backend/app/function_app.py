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
