<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container w-md-50 w-sm-99">

        <div class="modal-header">
          <slot name="header">
           <h5 class="modal-title" id="exampleModalLabel"> Write prescription</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          </slot>
        </div>

    <form
      class="msger-inputarea messageForm"
    >
        <div class="modal-body">        
        <div class="form-group">
            <label>Disease</label>
            <input type="text" name="name_of_disease" v-model="prescription.name_of_disease" class="form-control" required="">
             <div :class="`help-block with-errors name_of_disease-error`"></div>
        </div>
          <div class="form-group">
            <label>Symptoms</label>
         
            <textarea name="symptoms" v-model="prescription.symptoms" class="form-control" placeholder="symptoms" required=""></textarea>
            <div :class="`help-block with-errors symptoms-error`"></div>
        </div>

        <div class="form-group">
          <label>Medicine <small>(user comma(,) for separate medicine name)</small></label>
          <textarea name="medicine" v-model="prescription.medicine" class="form-control" placeholder="Medicine 1, Medicine 2, etc..." required=""></textarea>
          <div :class="`help-block with-errors medicine-error`"></div>
        </div>
          <div class="form-group">
            <label>Procedure to use medicine</label>
           
              <textarea name="procedure_to_use_medicine" v-model="prescription.procedure_to_use_medicine" class="form-control" placeholder="Procedure to use medicine" required=""></textarea>
            <div :class="`help-block with-errors procedure_to_use_medicine-error`"></div>
        </div>
          <div class="form-group">
            <label>Feedback</label>
            
            <textarea name="feedback" v-model="prescription.feedback" class="form-control" placeholder="feedback" required=""></textarea>
            <div :class="`help-block with-errors feedback-error`"></div>

        </div>
        <div class="form-group">
            <label>Signature</label>
            <input type="text" name="signature" v-model="prescription.signature" class="form-control" required="">
            <div :class="`help-block with-errors signature-error`"></div>
        </div>
                
        </div>
        <div class="modal-footer">
            <div :class="`text-right`">
                <button type="button" class="btn btn-outline-secondary mr-2" data-dismiss="modal"  @click="$emit('close')">Cancel</button>
                <button type="button" class="btn btn-primary submit-btn" @click="submitForm"><i></i> Save</button>
            </div>
        </div>
      </form>

      </div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import swal from 'sweetalert'

  export default {
    name: 'WritePrescriptionModal',
    components :{},
    props : ['settings','booking_id','b_index'],
    data() {
        return {
           prescription: {
              booking_id: this.booking_id,
              name_of_disease: '',
              symptoms: '',
              medicine: '',
              procedure_to_use_medicine: '',
              feedback: '',
              signature: '',
            },
        }
    },
    created() {
       
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitForm(){
         $("button.submit-btn").prop("disabled", true);
        $("button.submit-btn").html("Sending");

        this.isLoading = true;
          axios.post("/user/prescription-create", this.prescription).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.errors) {
                  for (var key in data.errors) {
                    swal("Oops!", data.errors[key][0], "error");
                    }
                    
                }else{
                    this.$parent.patients[this.b_index].have_prescription = true
                    this.$parent.patients[this.b_index].prescription_id = data.prescription_id
                    this.$emit('close');
                  swal('Good!','Created Successfully','success')
                  
                }
                this.isLoading = false;
                $("button.submit-btn").prop("disabled", false);
                $("button.submit-btn").html("Next Step");
            },
            error => {
                swal(String(error.response.status),error.response.statusText,'error')
            }
        );


      },
    },
    filters:{
    }
 
 
  };
</script>
<style scoped>
.w-md-50{
  width: 50%;
} 
@media only screen and (max-width: 600px){
  .w-sm-99{
  width: 96%;
  }
}
</style>
