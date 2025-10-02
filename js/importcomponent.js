const elements = document.querySelectorAll("import")

async function fetchComponent(relative, path) {
	const response = await fetch(path)
	const text = await response.text()
	return text
}

async function main() {
	for (let element of elements) {
		const path = element.getAttribute("path")
		const relative = element.getAttribute("relative-path")
		let importedElementString = await fetchComponent(relative, path)

		let doc = new DOMParser().parseFromString(
			importedElementString,
			"text/html"
		)

		for (let links of doc.querySelectorAll("[href]")) {
			let href = links.getAttribute("href")
			if (href.startsWith("/")) {
				let sliced = href.slice(1)
				let newHref = relative + sliced
				links.setAttribute("href", newHref)
			}
		}
		for (let links of doc.querySelectorAll("[src]")) {
			let src = links.getAttribute("src")
			if (src.startsWith("/")) {
				let sliced = src.slice(1)
				let newSrc = relative + sliced
				links.setAttribute("src", newSrc)
			}
		}

		element.insertAdjacentHTML("afterend", doc.documentElement.innerHTML)
		element.remove()
	}
}

main()