FROM node:lts-slim

USER node

WORKDIR /store-api

# RUN apt-get update && apt-get install -y wget

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

EXPOSE 3000

CMD ["sh", "-c", "yarn install && tail -f /dev/null"]
