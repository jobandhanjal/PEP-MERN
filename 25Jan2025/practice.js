const getData = () => {
        const req = fetch("https://dummyjson.com/products");
        req.then((res) => {
            console.log("Response ",res)
            const pr = res.json();
            pr.then((dataObj) => {
                console.log("Response 1 ",dataObj)
                // showProducts(dataObj);
            });
        }).catch((err) => {
            alert(err.message);
        });
    };
    getData();