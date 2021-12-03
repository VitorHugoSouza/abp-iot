import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { BulbOutlined, FormOutlined, RedoOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './Monitoramento.css';


export default function Monitoramento() {

	const [controle, setControle] = useState(4);
	const [estado, setEstado] = useState(true);
	const [volume, setVolume] = useState(2);
	const [placa, setPlaca] = useState([]);

	/*useEffect(() => {

  }, [placa]);*/


	return (
		<div>

			<h3>Bem vindo ao sistema de monitoramento online!</h3>

			<div>

				<Row gutter={16}>

					<Col span={8}>
						<Card style={{ width: 300 }} bordered={true}>
							<Meta
								avatar={<FormOutlined />}
								title="Controle de volume"
								style={{ marginBottom: '10px' }}
							/>

							{controle <= 5 ? <p><b>Volume inferior a 5 m³. Nivel crítico!</b></p> : <p>Temperatura ok</p>}

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
								<p>Lampada apagada. Verifique a temperatura!</p> 
								:
								<p>Lampada acesa. Temperatura controlada!</p>							
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

			<div>
				<label>PLACA 1 - ON</label>
			</div>

			<div>
				<label>PLACA 2 - ON</label>
			</div>

		</div>
	);
}