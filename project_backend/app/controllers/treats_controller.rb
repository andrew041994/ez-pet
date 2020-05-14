class TreatsController < ApplicationController

    def index
        pet = Pet.find_by(id: params[:pet_id])
        render json: pet.treats
        
    end

    def show
       render json: Treat.find_by(id: params[:id])
    end

    def destroy
        treat = Treat.find_by(id: params[:id])
        if treat.destroy
            render json: {message: "Successfully Deleted!"}
        end
    end



end
