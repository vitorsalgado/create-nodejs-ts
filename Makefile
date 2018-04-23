SHELL := /bin/bash
PROJECT := nodejs
PROJECT_TEST := $(PROJECT).test
DOCKER_IMAGE := $(PROJECT)
VERSION := $(shell node cli version)
BUILD := $$TRAVIS_BUILD_NUMBER




# running
# ##################################################################################################

dev:
	npm run start:dev




# qa
# ##################################################################################################

test:
	npm run test:all && \
	$(MAKE) -s print-test-report-path

test-docker:
	docker rm -f $(PROJECT_TEST) || true && \
	docker build -t $(PROJECT_TEST) -f Dockerfile.test . && \
	docker run --rm -v $$(pwd):/app --name $(PROJECT_TEST) -t $(PROJECT_TEST) && \
	$(MAKE) -s print-test-report-path

print-test-report-path:
	echo Coverage Report && \
	echo file://$(CONTEXT)/reports/coverage/lcov-report/index.html




# docker
# ##################################################################################################

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

docker-clean-dangling:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc)




# node.js
# ##################################################################################################

nvm:
	[ -s "$$HOME/.nvm/nvm.sh" ] && . "$$HOME/.nvm/nvm.sh" && \
	nvm install $$(cat .nvmrc) && \
	nvm use




# git
# ##################################################################################################

new-branch:
	git checkout -b $(b) && \
	git push origin $(b) && \
	git branch --set-upstream-to origin/$(b) $(b)

delete-old-branches:
	git fetch --all --prune; git branch --verbose | grep ": gone]" | awk '{ print $1 }' | xargs -n 1 git branch --delete --force

last-commit-msg:
	git log -1 --pretty=%B

last-commit-author:
	git log -1 --pretty=%an
