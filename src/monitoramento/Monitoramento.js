import React, { useEffect, useState } from 'react';
import { db } from 'services/firebase';
import { ref, onValue} from "firebase/database";

import { Card, Col, Divider, Row } from 'antd';
import { BulbOutlined, FormOutlined, RedoOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './Monitoramento.css';

export default function Monitoramento() {

	const [controle, setControle] = useState(5.2);
	const [estado, setEstado] = useState(true);
	const [volume, setVolume] = useState(5);
	const [placa, setPlaca] = useState([]);
	const [dadosPlaca1, setDadosPlaca1] = useState([]);
	const [distancia, setDistancia] = useState(0);

	function getDistancia() {
		const distanciaRef = ref(db, 'distancia');
		
		return onValue(distanciaRef, (distanciaCol) => {
			if(distanciaCol.exists()) {
				console.log('distancia atualizada ==>', distanciaCol.val());
				setDistancia(distanciaCol.val());
			}
		});
	}	

	function getPlaca1() {
		const distanciaRef = ref(db, 'placa-1');
		
		return onValue(distanciaRef, (placa) => {
			if(placa.exists()) {
				console.log('placa1 atualizada ==>', placa.val());
				setDadosPlaca1(placa.val());
			}
		});
	}	
	
	useEffect(() => {
		getDistancia();	
		getPlaca1();	
  }, []);

	return (
		<div>

			<h1>Distância atualizada: {distancia}</h1>

			<h1>Placa 1: {dadosPlaca1.distancia}</h1>
			<h1>Status: {dadosPlaca1.status}</h1>

			<h3>Bem vindo ao sistema de monitoramento online!</h3>

			<div style={{ marginTop: '30px'}}>			

				<Row gutter={16}>


					<Col span={8}>
						<Card style={{ width: 300 }} bordered={true}>
							<Meta
								avatar={<FormOutlined />}
								title="Controle de volume"
								style={{ marginBottom: '10px' }}
							/>

							{controle <= 5 ? <p style={{ color: 'red' }}><b>Volume inferior a 5 m³. Nivel crítico!</b></p> : <p style={{ color: 'green' }}>Volume em bom nível!</p>}

						</Card>
					</Col>

					<Col span={8}>
						<Card style={{ width: 300 }} bordered={true}>
							<Meta
								avatar={<BulbOutlined />}
								title="Estado lâmpada"
								style={{ marginBottom: '10px' }}
							/>

							{estado === true ? 
								<p style={{ color: 'green' }}>Lampada acesa. Temperatura controlada!</p>							
								:
								<p style={{ color: 'red' }}>Lampada apagada. Verifique a temperatura!</p> 
							}
							

						</Card>
					</Col>

					<Col span={8}>
						<Card style={{ width: 300 }} bordered={true}>
							<Meta
								avatar={<RedoOutlined />}
								title="Volume Atual do Silo"
								style={{ marginBottom: '10px' }}
							/>

							<p>Volume em {volume}m³.</p>

						</Card>
					</Col>

				</Row>
			</div>

			<Divider />
			
			<div>
				<p><b>Informações das placas conectadas</b></p>
			</div>

			<div>
				<label>PLACA 1 - ON</label>
			</div>

			<div>
				<label>PLACA 2 - ON</label>
			</div>

		</div>
	);
}