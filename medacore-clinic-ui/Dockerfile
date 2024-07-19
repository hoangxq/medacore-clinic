# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:16.19.1-bullseye-slim as builder

RUN mkdir /medacore-clinic-ui
WORKDIR /medacore-clinic-ui

RUN npm install -g @angular/cli@15.2.2

COPY package.json package-lock.json ./
RUN npm i --legacy-peer-deps

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

FROM builder as dev-envs

RUN apt-get update && \
    apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]