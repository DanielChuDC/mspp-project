# An interactive UI dashboard for Bee Queue

https://github.com/bee-queue/arena

# Before you begin

- Install docker and pull image from `mixmaxhq/arena`

# How to run the project

```
docker run -p 4567:4567 -v index.json:/opt/arena/src/server/config/index.json mixmaxhq/arena
```

To create from express with bull-arena
https://codewithhugo.com/bring-redux-to-your-queue-logic-an-express-setup-with-es6-and-bull-queue/
