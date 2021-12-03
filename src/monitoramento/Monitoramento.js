import React, { useEffect, useState } from 'react';
import { Card, Col, Divider, Row } from 'antd';
import { BulbOutlined, FormOutlined, RedoOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './Monitoramento.css';

export default function Monitoramento() {

	const [controle, setControle] = useState(5.2);
	const [estado, setEstado] = useState(true);
	const [volume, setVolume] = useState(5);
	const [placa, setPlaca] = useState([]);

	/*useEffect(() => {

  }, [placa]);*/


	return (
		<div>

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