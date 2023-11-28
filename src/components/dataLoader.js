
const dataLoader = async () => {
    try {
        const data = await fetch("https://restcountries.com/v3.1/independent?status=true");
        const results = await data.json();
        console.log("api called")
        return results;
      } catch (e) {
        console.error(e)
      }
};



export default dataLoader;