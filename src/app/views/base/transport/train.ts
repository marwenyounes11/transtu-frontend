/* Defines the train entity */
export interface Train {
     id: number;
	 numTransport: string;
	 immatriculation: string;
	 marque: string;
	 model: string;
	 gabarit: string;
     idDistrict: number;
     idLine: number;
	 idAccident: number;
	 idChauffeur: number;
	 idDegatMateriel: number;
}
