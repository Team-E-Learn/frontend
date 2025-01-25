# frontend

## Info
- Default port 3000.
- You must build the project before running.
## Running
### Docker
```
sudo docker build -t name-goes-here .
sudo docker run -p 3000:3000 name-goes-here
```
### Deno
```sh
deno task build
deno run ./build/index.js
```

### Using file structure

#assets

all assets such as images go in here

#lib

all library related documents go here

#routes

each folder in this file will represent a route ie the file CourseHome will be url/CourseHome
all svelte files go here

#shared 

shared files go here

#styles

all css files go in here

#utils
don't touch this otherwise things will break