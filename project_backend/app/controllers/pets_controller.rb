class PetsController < ApplicationController
    def index
        pet = Pet.all 
        render json: pet
    end

    def show 
        pet = Pet.find_by(id: params[:id])
        render json: pet.treats
    end
end
