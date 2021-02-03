class RootView extends View {
    initialize() {
        this.style = {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#FF000022",
        }

        let layout = new View();
        layout.style = {
            width: 200,
            height: 200,
            backgroundColor: "#FF000022",
            borderRadius: 10,
            borderColor: "#FF0000",
            borderWidth: 4,
        }

        let view = new View();
        view.style = {
            width: "100%",
            height: 50,
            backgroundColor: "#008000",
        }

        layout.appendChild(view);
        this.appendChild(layout);
    }
}

Hummer.render(new RootView());