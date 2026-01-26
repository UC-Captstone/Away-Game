import logging

async def run_nightly_task():
    """
    Nightly task that runs at 5 AM EST.
    """
    logging.info("Running nightly task at 5 AM EST")
    print("hello")
    logging.info("Nightly task completed")
