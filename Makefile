templates     := src/templates/*.html

build:
	rm -rf build/
	npm run webpack
	mkdir -p build/html
	cp $(templates) build/html

clean: 
		rm -rf build/