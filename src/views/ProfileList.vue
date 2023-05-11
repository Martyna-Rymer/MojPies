<template>
    <div class="container" style="margin-bottom: 50px;">
        <div class="row">
            <div class="col-lg-4 mb-3" v-for="user in users" :key="user.id">
                <router-link :to="{ name: 'profile', params: { userId: user.id } }">
                    <div class="card shadow rounded">
                        <div class="d-flex flex-row">
                        <img :src="user.imageSrc" class="card-img-top user-avatar rounded-circle mb-3" alt="User avatar">
                        <div class="card-body">
                            <h5 class="card-title word-wrap">{{ user.name }}<span v-if="user.city">, {{ user.city }}</span></h5>
                            <div v-for="dog in user.dogs" :key="dog.id">
                            <p class="card-text"><strong>{{ dog.name }}</strong> {{ dog.race }}, {{ dog.age }}{{ dog.age == 1 ? ' r.' : ' l.' }}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <NavBarComponent />
</template>

<script>
    import { ref, onMounted } from 'vue';
    import { getDocs, collection } from 'firebase/firestore';
    import { ref as storageRef, getDownloadURL } from 'firebase/storage';
    import { db, storage } from '@/firebase/index.js';
    import NavBarComponent from '@/components/NavBarComponent.vue';

    export default {
        components: { NavBarComponent },
        setup() {
        const users = ref([])

        const getAge = (year) => {
            const today = (new Date()).getFullYear();
            return today - year;
        };

        onMounted(async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));

        const fbUsersList = [];
        for (const doc of querySnapshot.docs) {
            const data = doc.data()
            const dogs = data.dogs.map(dog => {
                const age = getAge(dog.yearOfBirth);
                return { name: dog.name, race: dog.race, age: age };
            });

            let imageSrc;
            await getDownloadURL(storageRef(storage, `images/${doc.id}`))
            .then((url) => {
                imageSrc = url
            })
            .catch((error) => {
                imageSrc = '/MojPies/profile.png'
            });

            const user = { 
                id: doc.id, 
                name: data.name,
                city: data.city,
                dogs: dogs,
                imageSrc: imageSrc,
            };
            
            fbUsersList.push(user);
        }
        users.value = fbUsersList;


        });
        return {users}
        }
    }
</script>

<style>
    .user-avatar {
        margin-top: 10px;
        margin-left: 15px; 
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .card:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    @media (min-width: 576px) {
    .card {
        min-height: 100%;
    }
    }
</style>