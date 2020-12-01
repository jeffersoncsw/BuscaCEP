import {useState} from 'react';
import {Form, Button, Row} from 'react-bootstrap';

export default function Formulario(props){

    const[ cep, setCEP] = useState("");

    function monitoraCEP(evento){
        setCEP(evento.target.value)
    }

    function buscaCEP(evento){
        evento.preventDefault();

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                document.getElementById("endereco").innerHTML = `
                    <ul>
                        <li>${result.cep}</li>
                        <li>${result.logradouro}</li>
                        <li>${result.ibge}</li>
                    </ul>
                
                `
            },
            (error) => {
                
            }
        );
    }

    return(
        <Row>
            <div className="col-lg-4 col-md-6 mx-auto">
                <Form onSubmit={buscaCEP}>
                    <Form.Group>
                        <Form.Label>CEP: </Form.Label>
                        <Form.Control type="text" id="cep" onChange={monitoraCEP} />
                    </Form.Group>
                    <Button variant="success" type="submit" >
                        Buscar
                    </Button>
                    <div id="endereco">

                    </div>
                </Form>
            </div>
        </Row>
    )
}