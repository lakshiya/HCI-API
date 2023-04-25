1. Create virtual env 

virtualenv env

2. Activate env

source env/bin/activate

3. To kill used port 

sudo lsof -t -i tcp:105 | xargs kill -9