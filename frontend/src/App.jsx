import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import image from "./assets/background.png";
// import { TrashIcon } from '@heroicons/react/outline';
import DeleteIcon from './assets/icons/delete.svg'
import EditIcon from './assets/icons/edit.svg'
import AddIcon from './assets/icons/add.svg'

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [selectedHeroes, setSelectedHeroes] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        // alert(`${result[0].name}!`)
        setData(result);
      });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(name, power);

    const hero = { name, power };

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSelect = (hero) => {
    console.log(hero);

    if (selectedHeroes.includes(hero)) {
      setSelectedHeroes(selectedHeroes.filter((h) => h !== hero));
    } else {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
    console.log(selectedHeroes);
  };
  const handleAdd = () => {
    console.log("click");
  };

  const handleDelete = () => {
    const ids = selectedHeroes.map((hero) => hero.id);

    fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setData(data);
        setSelectedHeroes([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-black bg-opacity-50 rounded w-11/12 md:w-8/12 text-white backdrop-filter backdrop-blur-md">
          <div className="flex gap-2">
            <Button  onClick={handleAdd} icon={AddIcon} />
            <Button icon={EditIcon} />
            <Button onClick={handleDelete} icon={DeleteIcon}/>
          
           
            
          </div>
          <table className="table-fixed border-collapse w-full overflow-hidden">
            <thead>
              <tr>
                <th className="w-1/12"></th>
                <th className="w-4/12 text-left px-4 py-2">Name</th>
                <th className="w-7/12 text-left px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">Power</th>
              </tr>
            </thead>
            <tbody>
              {data.map((hero, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="appearance-none bg-white bg-check h-3 w-3 border border-black-300  checked:bg-black checked:border-transparent focus:outline-none"
                      checked={selectedHeroes.includes(hero)}
                      onChange={() => handleSelect(hero)}
                    />
                  </td>
                  <td className="px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">{hero.name}</td>
                  <td className="px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">{hero.power}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form action="POST" onSubmit={handleOnSubmit} className="flex flex-wrap gap-2 p-4">
            <input
              type="text"
            
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
        
              onChange={(event) => setPower(event.target.value)}
            />
            <input type="submit" value="lägg till" />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;