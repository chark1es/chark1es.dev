let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
    let codeElement = block.querySelector("code");

    // Create a container div
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("code-container");

    // Move the code element inside the container div
    containerDiv.appendChild(codeElement);

    // Append the container div and button to the pre block
    block.appendChild(containerDiv);

    // Create and append the button
    let button = document.createElement("copy-code-button");
    containerDiv.appendChild(button); // Append button to the containerDiv, not block
});
