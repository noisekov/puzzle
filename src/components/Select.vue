 <template>
    <div class="select">
        <label :for="`${name}-select`">{{name}}</label>
        <select :name="`${name}`" :id="`${name}-select`">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    </div>
 </template>
 
 <script setup lang="ts">
    defineProps<{ name: string }>()
 </script>
 
 <style scoped>
 .select {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
 }
 </style>