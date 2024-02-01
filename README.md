# PixelPulse

## To see it working, first clone the repo

## Then run the backend server -

-   `cd backend`
-   `python -m venv menv`
-   `./menv/Scripts/activate`
-   Select python interpreter to be venv
-   Install the dependencies using `pip install -r requirements.txt`
-   `uvicorn app:app`

## Then run the frontend -

-   `cd frontend`
-   `npm install`
-   `npm run dev`

This will launch the home page.

You can also look at 2 other pages that are served data from 2 different endpoints.
Just add `data1` or `data2` to the base url.
