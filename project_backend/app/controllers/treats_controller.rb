class TreatsController < ApplicationController

    def index
        treats = Treat.all
        render json: treats
        
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
