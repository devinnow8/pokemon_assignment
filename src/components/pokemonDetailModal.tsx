import Modal from 'react-modal';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import customStyles from '../common/modalStyles.js';
import { getURLRequests } from '../api/baseAPI';
import { useState, useEffect } from 'react';
import '../pages/homePage.scss';
import {
	ChildComponentProps,
	Ability,
	PokemonAbility,
	Move,
	List,
	PokemonType
} from '@/types/pokemon';
interface PokemonInfo {
	abilitiesData: Ability[];
	movesData: string[];
	species: string;
	typeData:string[];
}

function ModalContainer({
	modal,
	data,
	setModal,
}: {
	modal: boolean;
	data: List;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [pokemonInfo, setPokemonDetails] = useState<PokemonInfo>(
		{} as PokemonInfo
	);

	const getPokemonDetails = useCallback(async () => {
		try {
			const abilities = data.abilities.map(
				(value: PokemonAbility) => value.ability
			);
			const moves = data.moves.map((move: Move) => move.move.name);
			
			const types = data.types.map((typeElement: PokemonType) => typeElement.type.name);
			const pokemonInfo = {
				abilitiesData: abilities,
				movesData: moves,
				species: data?.species?.name,
				typeData:types
			};
			setPokemonDetails(pokemonInfo);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching abilities:', error);
		}
	}, []);

	useEffect(() => {
		getPokemonDetails();
	}, []);

	return loading ? (
		<div>Loading...</div>
	) : (
		<div>
			<Modal
				isOpen={modal}
				onRequestClose={() => setModal(false)}
				style={customStyles}
				contentLabel="Example Modal"
				ariaHideApp={false}
			>
				<div className="modal-header">
					<h3>{data.name.toUpperCase()} </h3>
					<button onClick={() => setModal(false)}>&times;</button>
				</div>
				<div className="abilities-modal">
					<div className="abilities-modal-content">
						{pokemonInfo?.species && (
							<>
								<div >
									<h1>SPECIES :</h1>
									<ul>
										<li>{pokemonInfo.species}</li>
									
								</ul>
								</div>
							</>
						)}
						{Object.keys(pokemonInfo).includes('abilitiesData') && (
							<div>
								<h1>ABILITIES</h1>
								<ul>
									{pokemonInfo.abilitiesData?.map(
										(dataItem: Ability, index) => {
											return (
												<>
													<li key={index}>{dataItem.name}</li>{' '}
													{/* <button onClick={() => seeFullDetails(dataItem)}>
                      SEE FULL DETAILS
                    </button>  */}
												</>
											);
										}
									)}
								</ul>
							</div>
						)}
						{Object.keys(pokemonInfo).includes('typeData') && (
							<div>
								<h1>TYPES</h1>
								<ul>
									{pokemonInfo.typeData?.map((dataItem: string, index) => {
										return <li key={index}>{dataItem}</li>;
									})}
								</ul>
							</div>
						)}
						{Object.keys(pokemonInfo).includes('movesData') && (
							<div>
								<h1>MOVES</h1>
								<ul>
									{pokemonInfo.movesData?.map((dataItem: string, index) => {
										return <li key={index}>{dataItem}</li>;
									})}
								</ul>
							</div>
						)}
						
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default ModalContainer;
