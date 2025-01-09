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
