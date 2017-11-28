SHELL := /bin/bash
PROJECT := nodejs
PROJECT_TEST := $(PROJECT).test
DOCKER_IMAGE := $(PROJECT)
VERSION := $(shell node cli version)
BUILD := $$TRAVIS_BUILD_NUMBER



#######################################
# Node.js related recipes
#######################################

dev:
	npm run start:dev

test:
	npm run test:all

test-docker:
	docker rm -f $(PROJECT_TEST) || true && \
	docker build -t $(PROJECT_TEST) -f Dockerfile.test . && \
	docker run --rm -v $$(pwd):/app --name $(PROJECT_TEST) -t $(PROJECT_TEST) && \
	echo Coverage Report && \
	echo file://$$(pwd)/reports/coverage/lcov-report/index.html



#######################################
# Docker
# Build, Tag and Push docker image to a registry
#######################################

docker: docker-build docker-push docker-cleanup

docker-build:
	docker build -t $(DOCKER_IMAGE):$(BUILD) . && \
	docker tag $(DOCKER_IMAGE):$(BUILD) $(DOCKER_IMAGE):latest && \
	docker tag $(DOCKER_IMAGE):$(BUILD) $(DOCKER_IMAGE):$(VERSION)

docker-push:
	docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD} && \
	docker push $(DOCKER_IMAGE):latest && \
	docker push $(DOCKER_IMAGE):$(VERSION)

docker-cleanup:
	docker rmi -f $(DOCKER_IMAGE):$(VERSION) || true && \
	docker rmi -f $(DOCKER_IMAGE):latest || true

.PHONY: dev
