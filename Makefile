templates     := src/templates/*.html

build: clean
	rm -rf build/
	npm run webpack
	mkdir -p build/html
	cp $(templates) build/html

package: clean build
	zip -r package.zip build/

clean: 
		rm -rf build/