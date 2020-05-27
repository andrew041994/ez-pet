class PetsController < ApplicationController
    def index
        pet = Pet.all 
        render json: pet
    end

    def show 
        pet = Pet.find_by(id: params[:id])
        render json: pet.treats
    end

    def create
        
        pet = Pet.new(pet_params)

        if pet.save
            render json: pet
            
        else
            render json: {message: "Pet Not Saved"}
        end
    end

    def destroy
     Pet.find_by(id: params[:id]).destroy

        render json: {message: "Pet Deleted"}
        
    end


    private

    def pet_params
        
        params.require(:pet).permit(:name)
        
    end
end
