class TreatsController < ApplicationController

    def index
        pet = Pet.find_by(id: params[:pet_id])
        render json: pet.treats
        
    end

    def show
       render json: Treat.find_by(id: params[:id])
    end

    def create 
        # byebug
        treat = Treat.new(treat_params)

        if treat.save
            render json: treat
        else
            render json: {message: "Could Not Save"}
        end

    end

    def destroy
        treat = Treat.find_by(id: params[:id])
        if treat.destroy
            render json: {message: "Successfully Deleted!"}
        else
            render json: {message: "Treat Was Not Deleted"}
        end

    end

    private

    def treat_params 
        params.require(:treat).permit(:name, :pet_id)
    end


end
